---
title: Payment Integrations
description: Integrate Stripe and Plaid with Mixin Network for payment processing and fiat on-ramps
sidebar_position: 5
---

# Payment Integrations with Stripe and Plaid

This guide demonstrates how to integrate Stripe and Plaid with Mixin Network applications. Whether you're building a crypto payment processor or a fiat-to-crypto on-ramp, these integrations enable seamless cryptocurrency transactions.

## Overview

### Stripe + Mixin Integration

Stripe integration with Mixin allows you to:
- Accept fiat payments via Stripe
- Convert fiat to cryptocurrency on Mixin
- Create a unified payment experience for users
- Leverage Stripe's fraud detection with Mixin's security

**Typical Flow:**
```
User → Stripe Payment → Webhook Event → Convert to Crypto → Mixin Transfer → User Crypto Wallet
```

### Plaid + Mixin Integration

Plaid integration with Mixin enables:
- Direct bank account linking for users
- Automated bank-to-crypto conversions
- KYC/AML compliance for on-ramps
- ACH transfers directly to your Mixin bot

**Typical Flow:**
```
User Bank Account → Plaid Link → Token Exchange → ACH Transfer → Mixin Custody → User Wallet
```

---

## Stripe Integration

### Prerequisites

- Stripe account with API keys (Publishable and Secret)
- Mixin bot created and configured
- Node.js server for webhook handling
- Mixin SDK for Node.js installed

### Setup Instructions

#### 1. Get Your Stripe Credentials

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API Keys**
3. Copy your:
   - **Publishable Key** (pk_...)
   - **Secret Key** (sk_...) - Keep this secure!
   - **Webhook Signing Secret** (whsec_...)

#### 2. Configure Mixin Bot

Ensure your Mixin bot has:
- Valid `keystore.json` with app credentials
- A designated cryptocurrency asset for conversions (e.g., USDC)
- Sufficient balance for test transactions

#### 3. Set Up Environment Variables

```bash
# .env
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

MIXIN_APP_ID=your_app_id
MIXIN_SESSION_ID=your_session_id
MIXIN_SESSION_KEY=your_session_key
MIXIN_PIN_TOKEN=your_pin_token
MIXIN_SPEND_KEY=your_spend_key

# Asset ID for conversions (e.g., USDC on Mixin)
MIXIN_ASSET_ID=965e5c6e-434c-3fa9-b780-c50f43cd955c
```

### Implementation: Payment Processing

#### Step 1: Create a Payment Intent

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPaymentIntent(amountInCents, description) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents, // Amount in cents (e.g., 10000 = $100.00)
      currency: 'usd',
      description: description,
      metadata: {
        // Store Mixin user ID for later reference
        mixin_user_id: 'user_mixin_id',
        order_id: 'your_order_id'
      }
    });

    return {
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}
```

#### Step 2: Handle Webhook Events

```javascript
const express = require('express');
const app = express();

app.post('/webhook/stripe', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.sendStatus(400);
  }

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;

    case 'payment_intent.payment_failed':
      await handlePaymentFailure(event.data.object);
      break;

    case 'charge.refunded':
      await handleRefund(event.data.object);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.sendStatus(200);
});

async function handlePaymentSuccess(paymentIntent) {
  const { id, metadata, amount } = paymentIntent;
  const { mixin_user_id, order_id } = metadata;

  try {
    // Calculate crypto amount (example: $100 USD = 100 USDC)
    const cryptoAmount = amount / 100; // Convert cents to dollars

    // Send crypto transfer via Mixin
    await sendMixinTransfer(
      mixin_user_id,
      cryptoAmount,
      `Payment for order ${order_id}`
    );

    // Store transaction record
    await saveTransaction({
      payment_intent_id: id,
      mixin_user_id,
      order_id,
      amount: cryptoAmount,
      status: 'completed',
      timestamp: new Date()
    });

    console.log(`Payment ${id} successfully processed`);
  } catch (error) {
    console.error(`Error processing payment ${id}:`, error);
    // Implement retry logic or manual review process
  }
}

async function handlePaymentFailure(paymentIntent) {
  const { id, metadata, last_payment_error } = paymentIntent;
  const { mixin_user_id } = metadata;

  console.error(`Payment ${id} failed:`, last_payment_error.message);

  // Notify user
  await notifyUser(mixin_user_id, `Payment failed: ${last_payment_error.message}`);

  // Log for analysis
  await saveTransaction({
    payment_intent_id: id,
    mixin_user_id,
    status: 'failed',
    error: last_payment_error.message,
    timestamp: new Date()
  });
}
```

#### Step 3: Send Mixin Transfer

```javascript
const { Client } = require('@mixin/mixin-node-sdk');

async function sendMixinTransfer(recipientUserId, amount, memo) {
  try {
    // Initialize Mixin client
    const client = new Client({
      client_id: process.env.MIXIN_APP_ID,
      session_id: process.env.MIXIN_SESSION_ID,
      session_key: process.env.MIXIN_SESSION_KEY,
      pin_token: process.env.MIXIN_PIN_TOKEN,
      spend_key: process.env.MIXIN_SPEND_KEY
    });

    // Create transfer
    const transfer = await client.transfer({
      asset_id: process.env.MIXIN_ASSET_ID,
      opponent_id: recipientUserId,
      amount: amount.toString(),
      pin: process.env.MIXIN_PIN, // User's PIN
      memo: memo
    });

    console.log('Transfer successful:', transfer.transaction_hash);
    return transfer;
  } catch (error) {
    console.error('Error sending Mixin transfer:', error);
    throw error;
  }
}
```

### Best Practices for Stripe Integration

:::warning
**Security First:**
- Never commit `.env` files or private keys to version control
- Use environment variables or secure vaults (e.g., AWS Secrets Manager)
- Verify webhook signatures on every event
- Implement rate limiting on your payment endpoints
:::

#### 1. **Secure Credential Management**
```javascript
// Use a secrets manager (example: AWS Secrets Manager)
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

async function getSecrets() {
  const params = {
    SecretId: 'mixin-stripe-integration'
  };
  const secret = await secretsManager.getSecretValue(params).promise();
  return JSON.parse(secret.SecretString);
}
```

#### 2. **Error Handling and Retries**
```javascript
async function sendMixinTransferWithRetry(recipientUserId, amount, memo, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await sendMixinTransfer(recipientUserId, amount, memo);
    } catch (error) {
      lastError = error;
      console.warn(`Transfer attempt ${attempt} failed, retrying...`);
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  throw new Error(`Transfer failed after ${maxRetries} attempts: ${lastError.message}`);
}
```

#### 3. **Transaction Reconciliation**
```javascript
async function reconcileTransactions() {
  // Fetch pending transactions
  const pending = await getPendingTransactions();

  for (const transaction of pending) {
    try {
      // Check Stripe payment status
      const stripePayment = await stripe.paymentIntents.retrieve(
        transaction.payment_intent_id
      );

      // Check Mixin transaction status
      const mixinTx = await getMixinTransaction(transaction.mixin_tx_hash);

      // Update record if statuses match
      if (stripePayment.status === 'succeeded' && mixinTx.status === 'confirmed') {
        await updateTransaction(transaction.id, { status: 'reconciled' });
      }
    } catch (error) {
      console.error('Reconciliation error:', error);
    }
  }
}
```

---

## Plaid Integration

### Prerequisites

- Plaid account with API keys (Client ID and Secret)
- Mixin bot with ACH transfer capability
- Frontend with Plaid Link integration
- Node.js backend for token exchange

### Setup Instructions

#### 1. Get Your Plaid Credentials

1. Log in to [Plaid Dashboard](https://dashboard.plaid.com)
2. Navigate to **Team Settings** → **API Keys**
3. Copy your:
   - **Client ID**
   - **Secret** (sandbox and production)
4. Note your **Environment**: sandbox or production

#### 2. Set Up Environment Variables

```bash
# .env
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET_sandbox=your_sandbox_secret
PLAID_SECRET_production=your_production_secret
PLAID_ENV=sandbox # or 'production'

MIXIN_APP_ID=your_app_id
MIXIN_SESSION_ID=your_session_id
MIXIN_SESSION_KEY=your_session_key
MIXIN_PIN_TOKEN=your_pin_token
MIXIN_SPEND_KEY=your_spend_key
```

### Implementation: Bank Account Linking

#### Step 1: Create Link Token

```javascript
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env[`PLAID_SECRET_${process.env.PLAID_ENV}`]
    }
  }
});

const plaidClient = new PlaidApi(configuration);

async function createLinkToken(userId) {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: userId
      },
      client_name: 'Your App Name',
      language: 'en',
      country_codes: ['US'],
      products: ['auth'], // For bank account verification
      auth: {
        auth_type_select_enabled: false,
        automated_microdeposits_enabled: true
      }
    });

    return response.data.link_token;
  } catch (error) {
    console.error('Error creating link token:', error);
    throw error;
  }
}

app.post('/api/plaid/link-token', async (req, res) => {
  const { userId } = req.body;

  try {
    const linkToken = await createLinkToken(userId);
    res.json({ link_token: linkToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

#### Step 2: Exchange Public Token for Access Token

```javascript
async function exchangePublicToken(publicToken, userId) {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Store access token securely (encrypted)
    await savePlaidCredentials(userId, accessToken, itemId);

    return { accessToken, itemId };
  } catch (error) {
    console.error('Error exchanging public token:', error);
    throw error;
  }
}

app.post('/api/plaid/exchange-token', async (req, res) => {
  const { public_token, userId } = req.body;

  try {
    const { accessToken, itemId } = await exchangePublicToken(public_token, userId);
    res.json({ success: true, item_id: itemId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

#### Step 3: Retrieve Bank Account Information

```javascript
async function getBankAccounts(userId) {
  try {
    // Retrieve stored access token
    const credentials = await getPlaidCredentials(userId);
    const { accessToken } = credentials;

    // Get auth information
    const response = await plaidClient.authGet({
      access_token: accessToken
    });

    const accounts = response.data.accounts;
    const numbers = response.data.numbers.ach;

    // Map accounts with their routing/account numbers
    const bankAccounts = accounts.map(account => {
      const achNumber = numbers.find(n => n.account_id === account.account_id);
      return {
        account_id: account.account_id,
        account_name: account.name,
        account_type: account.type,
        account_subtype: account.subtype,
        routing_number: achNumber?.routing || null,
        account_number: achNumber?.account || null,
        mask: account.mask
      };
    });

    return bankAccounts;
  } catch (error) {
    console.error('Error retrieving bank accounts:', error);
    throw error;
  }
}
```

#### Step 4: Initiate ACH Transfer to Mixin

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function initiateACHTransfer(userId, bankAccountId, amountInCents) {
  try {
    // Get bank account details
    const bankAccounts = await getBankAccounts(userId);
    const selectedAccount = bankAccounts.find(acc => acc.account_id === bankAccountId);

    if (!selectedAccount) {
      throw new Error('Bank account not found');
    }

    // Create ACH transfer via Stripe Connect (requires Stripe Connect setup)
    // OR use Plaid Link + custom ACH processor
    
    // Example: Using Stripe for ACH processing
    const transfer = await stripe.transfers.create({
      amount: amountInCents,
      currency: 'usd',
      destination: 'acct_...' // Stripe Connect account
    });

    // Record transfer and queue for Mixin conversion
    const cryptoAmount = amountInCents / 100 * 1; // Example: 1:1 USD to USDC
    
    await queueMixinTransfer({
      user_id: userId,
      bank_account_id: bankAccountId,
      fiat_amount: amountInCents / 100,
      crypto_amount: cryptoAmount,
      stripe_transfer_id: transfer.id,
      status: 'pending'
    });

    return { transfer_id: transfer.id };
  } catch (error) {
    console.error('Error initiating ACH transfer:', error);
    throw error;
  }
}
```

### Best Practices for Plaid Integration

:::warning
**Compliance Considerations:**
- Implement KYC/AML checks before enabling transfers
- Store access tokens encrypted and securely
- Monitor for suspicious activity patterns
- Comply with FinCEN and state money transmitter regulations
:::

#### 1. **KYC/AML Compliance**
```javascript
async function verifyUserKYC(userId, personalInfo) {
  try {
    // Example using a third-party KYC service
    const kycResult = await kycService.verify({
      name: personalInfo.name,
      email: personalInfo.email,
      date_of_birth: personalInfo.dob,
      address: personalInfo.address
    });

    if (kycResult.status === 'approved') {
      await updateUserKYCStatus(userId, 'verified', kycResult.id);
      return true;
    } else {
      console.warn(`KYC verification failed: ${kycResult.reason}`);
      return false;
    }
  } catch (error) {
    console.error('KYC verification error:', error);
    throw error;
  }
}

// Middleware to check KYC before allowing transfers
async function requireKYC(req, res, next) {
  const { userId } = req.user;
  const kycStatus = await getUserKYCStatus(userId);

  if (kycStatus !== 'verified') {
    return res.status(403).json({ error: 'KYC verification required' });
  }

  next();
}
```

#### 2. **Secure Token Storage**
```javascript
const crypto = require('crypto');

async function savePlaidCredentials(userId, accessToken, itemId) {
  // Encrypt access token
  const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let encrypted = cipher.update(accessToken, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Store encrypted token
  await db.plaidCredentials.create({
    user_id: userId,
    item_id: itemId,
    access_token: encrypted,
    created_at: new Date()
  });
}

async function getPlaidCredentials(userId) {
  const record = await db.plaidCredentials.findOne({ user_id: userId });

  if (!record) {
    throw new Error('Plaid credentials not found');
  }

  // Decrypt access token
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let decrypted = decipher.update(record.access_token, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return {
    item_id: record.item_id,
    accessToken: decrypted
  };
}
```

#### 3. **Rate Limiting and Error Handling**
```javascript
const rateLimit = require('express-rate-limit');

// Rate limit Plaid API calls
const plaidLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: 'Too many API requests, please try again later'
});

app.post('/api/plaid/link-token', plaidLimiter, async (req, res) => {
  // ... implementation
});

async function callPlaidWithRetry(operation, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      // Don't retry authentication errors
      if (error.response?.status === 401) {
        throw error;
      }

      console.warn(`Plaid operation attempt ${attempt} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  throw lastError;
}
```

#### 4. **Transaction Verification**
```javascript
async function verifyBankTransfer(transferId) {
  try {
    // Check with Plaid Transactions endpoint
    const credentials = await getPlaidCredentials(userId);
    
    const response = await plaidClient.transactionsGet({
      access_token: credentials.accessToken,
      start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      end_date: new Date()
    });

    const transaction = response.data.transactions.find(
      t => t.transaction_id === transferId
    );

    return transaction || null;
  } catch (error) {
    console.error('Error verifying transaction:', error);
    throw error;
  }
}
```

---

## Common Patterns and Considerations

### Authentication Flow

Both integrations require secure credential management:

```javascript
// Middleware to authenticate Mixin users
async function authenticateMixinUser(req, res, next) {
  const { mixin_token } = req.headers;

  try {
    const user = await verifyMixinToken(mixin_token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.use(authenticateMixinUser);
```

### Error Handling Across Platforms

```javascript
class PaymentProcessingError extends Error {
  constructor(message, platform, originalError) {
    super(message);
    this.platform = platform;
    this.originalError = originalError;
  }
}

async function handlePaymentError(error) {
  if (error instanceof PaymentProcessingError) {
    console.error(`${error.platform} error: ${error.message}`);

    if (error.platform === 'stripe') {
      // Handle Stripe-specific errors
      if (error.originalError.code === 'rate_limit') {
        // Implement backoff
      }
    } else if (error.platform === 'plaid') {
      // Handle Plaid-specific errors
      if (error.originalError.error_code === 'ITEM_LOGIN_REQUIRED') {
        // Prompt user to re-authenticate
      }
    }
  }
}
```

### Testing in Sandbox Environments

```javascript
// Use test credentials in sandbox
const isDevelopment = process.env.NODE_ENV === 'development';

const stripeKey = isDevelopment 
  ? process.env.STRIPE_TEST_SECRET_KEY 
  : process.env.STRIPE_PROD_SECRET_KEY;

const plaidEnv = isDevelopment ? 'sandbox' : 'production';

// Test payment intent in sandbox
if (isDevelopment) {
  // Use Stripe test card: 4242 4242 4242 4242
  // Use Plaid test credentials for sandbox
}
```

---

## References and Additional Resources

### Official Documentation
- [Stripe API Reference](https://stripe.com/docs/api)
- [Plaid API Reference](https://plaid.com/docs/api)
- [Mixin SDK Documentation](https://github.com/MixinNetwork/bot-api-nodejs-client)
- [Mixin API Guide](../../../api/guide)

### Community Support
- [Mixin Developers Group](https://mixin.one/codes/2db90a85-edff-4ab0-ae89-ce0619e2638e)
- [Stripe Support](https://support.stripe.com)
- [Plaid Support](https://support.plaid.com)

### Related Guides
- [Creating a Mixin Bot](../getting-started/create-dapp)
- [Mixin API Reference](../../../api/guide)
- [Security Best Practices](../security)
```

---

## 📋 How to Use This Content

1. **Create a new file** in your fork at: `developers-docs/docs/app/guide/payment-integrations.md`
2. **Copy and paste** the entire content above
3. **Commit and push** to your `add-payment-integrations` branch
4. **Open a Pull Request** to the main MixinNetwork repository

This documentation is now ready to contribute to the Mixin developers community! 🚀
