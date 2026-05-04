#!/usr/bin/env bash
# Watch the deliverables folder and auto-commit + push every change.
# GitHub Pages then rebuilds the public site within ~30–60 seconds.
#
# First-time setup (run once):
#   ./watch-and-deploy.sh init <github-username>
#
# Daily use:
#   ./watch-and-deploy.sh           # foreground (Ctrl-C to stop)
#   ./watch-and-deploy.sh start     # background; pid stored in .watch.pid
#   ./watch-and-deploy.sh stop      # stop the background watcher
#   ./watch-and-deploy.sh status    # check if the watcher is running
#   ./watch-and-deploy.sh deploy    # one-shot commit+push without watching
#
# Requires: gh, git, fswatch  (already installed)

set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

REPO_NAME="horizon-ds-guidelines"
PID_FILE="$HERE/.watch.pid"
LOG_FILE="$HERE/.watch.log"

cmd_init() {
  local user="${1:-}"
  if [ -z "$user" ]; then
    echo "usage: $0 init <github-username>" >&2; exit 1
  fi
  git init -q -b main 2>/dev/null || true
  git add -A
  git -c user.name="Horizon DS" -c user.email="design@blogvault.local" \
      commit -m "Initial publish of Horizon DS guidelines" --allow-empty -q || true
  if ! gh auth status >/dev/null 2>&1; then
    echo ">> Run 'gh auth login' first (one time), then re-run: $0 init $user"; exit 1
  fi
  if ! gh repo view "$user/$REPO_NAME" >/dev/null 2>&1; then
    gh repo create "$user/$REPO_NAME" --public --source=. --remote=origin --push
  else
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://github.com/$user/$REPO_NAME.git"
    git push -u origin main
  fi
  # Enable GitHub Pages on main / root
  gh api -X POST "repos/$user/$REPO_NAME/pages" \
        -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1 \
    || gh api -X PUT "repos/$user/$REPO_NAME/pages" \
        -f "source[branch]=main" -f "source[path]=/" >/dev/null
  echo
  echo "✅ Deployed."
  echo "🌐 Public URL:  https://$user.github.io/$REPO_NAME/"
  echo "    (first build can take ~60 s)"
  echo
  echo "Next:  $0 start    # auto-deploy on every save"
}

cmd_deploy() {
  if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
    git add -A
    git -c user.name="Horizon DS" -c user.email="design@blogvault.local" \
        commit -m "auto: $(date '+%Y-%m-%d %H:%M:%S')" -q
    git push -q origin main
    echo "$(date '+%H:%M:%S')  pushed"
  fi
}

cmd_watch() {
  echo "Watching $HERE for changes (.md, .html, .css, .js)..."
  echo "Each save → commit → push → GitHub Pages rebuild (~30–60 s)."
  echo "Stop: Ctrl-C"
  fswatch -o -e ".*" -i '\.md$' -i '\.html$' -i '\.css$' -i '\.js$' "$HERE" \
    | while read -r _; do
        sleep 1   # debounce burst saves
        cmd_deploy || true
      done
}

cmd_start() {
  if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    echo "Already running, pid=$(cat "$PID_FILE")"; exit 0
  fi
  nohup "$0" watch >"$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"
  echo "Started in background, pid=$(cat "$PID_FILE"), log=$LOG_FILE"
}

cmd_stop() {
  if [ -f "$PID_FILE" ]; then
    kill "$(cat "$PID_FILE")" 2>/dev/null || true
    rm -f "$PID_FILE"
    echo "Stopped."
  else
    echo "Not running."
  fi
}

cmd_status() {
  if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    echo "Running, pid=$(cat "$PID_FILE")"
    tail -3 "$LOG_FILE" 2>/dev/null || true
  else
    echo "Not running."
  fi
}

case "${1:-watch}" in
  init)   shift; cmd_init "${1:-}";;
  deploy) cmd_deploy;;
  watch)  cmd_watch;;
  start)  cmd_start;;
  stop)   cmd_stop;;
  status) cmd_status;;
  *) echo "usage: $0 {init <user>|deploy|watch|start|stop|status}" >&2; exit 1;;
esac
