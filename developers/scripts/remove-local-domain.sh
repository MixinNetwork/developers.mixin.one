#!/bin/zsh

set -euo pipefail

HOSTNAME="developers.mixin.one"
ANCHOR="com.apple/codex.developers.mixin.one"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script with sudo."
  exit 1
fi

/usr/bin/perl -0pi -e "s/\n127\\.0\\.0\\.1 ${HOSTNAME}\n/\n/g; s/\n::1 ${HOSTNAME}\n/\n/g" /etc/hosts
/usr/bin/dscacheutil -flushcache
/usr/bin/killall -HUP mDNSResponder >/dev/null 2>&1 || true
/sbin/pfctl -a "${ANCHOR}" -F nat >/dev/null 2>&1 || true

echo "Local domain routing has been removed."
