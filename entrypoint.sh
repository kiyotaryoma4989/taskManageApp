#!/bin/bash
set -e

# PIDファイルが残っていたら削除
rm -f /myapp/tmp/pids/server.pid

# コンテナのコマンドを実行
exec "$@"