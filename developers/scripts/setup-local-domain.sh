#!/bin/zsh

set -euo pipefail

HOSTNAME="developers.mixin.one"
HOST_ENTRY_V4="127.0.0.1 ${HOSTNAME}"
ANCHOR="com.apple/codex.developers.mixin.one"
RULE="rdr pass on lo0 inet proto tcp from any to any port 443 -> 127.0.0.1 port 5173"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script with sudo."
  exit 1
fi

if grep -Eq "^::1[[:space:]]+${HOSTNAME}([[:space:]]|\$)" /etc/hosts; then
  /usr/bin/perl -0pi -e "s/\n::1 ${HOSTNAME}\n/\n/g" /etc/hosts
fi

if ! grep -Eq "^127\\.0\\.0\\.1[[:space:]]+${HOSTNAME}([[:space:]]|\$)" /etc/hosts; then
  printf '\n%s\n' "${HOST_ENTRY_V4}" >> /etc/hosts
fi

/usr/bin/dscacheutil -flushcache
/usr/bin/killall -HUP mDNSResponder >/dev/null 2>&1 || true

/sbin/pfctl -a "${ANCHOR}" -F nat >/dev/null 2>&1 || true
printf '%s\n' "${RULE}" | /sbin/pfctl -a "${ANCHOR}" -Ef -

echo "Local domain routing is ready:"
echo "  https://${HOSTNAME}"
