---
title: Transfer
---


## Send Transfers

In Mixin Network, there are two kinds of transactions we can send: regular transactions between two regular Mixin accounts (like normal users and applications) and the "raw" transaction among the raw Kernel addresses. Of course, both of them are free and instant.

The regular transactions are created by [`/transfer`](/api/transfer/transfer) API. Here is a simple example in Golang:

```go
type TransferInput struct {
	AssetId     string
	RecipientId string
	Amount      number.Decimal
	TraceId     string
	Memo        string
	OpponentKey string
}

func CreateTransfer(ctx context.Context, in *TransferInput, uid, sid, sessionKey, pin, pinToken string) error {
	if in.Amount.Exhausted() {
		return fmt.Errorf("Amount exhausted")
	}

	encryptedPIN, err := EncryptPIN(ctx, pin, pinToken, sid, sessionKey, uint64(time.Now().UnixNano()))
	if err != nil {
		return err
	}
	data, err := json.Marshal(map[string]interface{}{
		"asset_id":    in.AssetId,
		"opponent_id": in.RecipientId,
		"amount":      in.Amount.Persist(),
		"trace_id":    in.TraceId,
		"memo":        in.Memo,
		"pin":         encryptedPIN,
	})
	if err != nil {
		return err
	}

	path := "/transfers"
	token, err := SignAuthenticationToken(uid, sid, sessionKey, "POST", path, string(data))
	if err != nil {
		return err
	}
	body, err := Request(ctx, "POST", path, data, token)
	if err != nil {
		return err
	}

	var resp struct {
		Error Error `json:"error"`
	}
	err = json.Unmarshal(body, &resp)
	if err != nil {
		return err
	}
	if resp.Error.Code > 0 {
		return resp.Error
	}
	return nil
}
```

:::caution
The field `trace_id` should be an UUID, but in most cases, using a random UUID may lead to a problem. Please read this article for more details: [Top 10 Most Common Mistakes That Mixin Developers Make](https://gitpress.io/@lyric/top-10-most-common-mistakes-that-mixin-developers-make).
:::


## Handle Incoming Transactions

We don't need to "receive" crypto actually, because the Mixin API are always expected to return the correct amount of crypto when Kernel confirms the transactions.

However, we may need to handle the incoming transactions. For example, we may want to send notifications to the user when the transaction is received.

There are two ways to do this:

1. Handle [SYSTEM_ACCOUNT_SNAPSHOT](/api/messages/category#transfers) messages in message loop;
2. [Sync all related snapshots](../guide/sync-snapshots) in a background job.

This time, we will use the first way.

<!-- @TODO -->
...

The first condition is that the category of messages. The second is that the comparison of message.UserID and the bot's clientID (the Client ID is the userID of the bot, you can see it in the keystore file).

```go
// @TODO an example
// ...
if msg.Category == mixin.MessageCategorySystemAccountSnapshot {
  // if the message is a transfer message
  // and it is sent by other users, then handle it
  if msg.UserID != client.ClientID {
    return handleTransfer(ctx, msg)
  }
  // or just drop it
  return nil
} else if ...
```

The reason for the second condition is that in Mixin Messenger, all transfers related this bot will be received in the messaging loop, no matter it comes from other person or sent by the bot itself. So we compare the message's userID and ignore the transfer sent by the bot.

<!-- @TODO -->
...
