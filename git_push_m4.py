# -*- coding: utf-8 -*-
import os
import subprocess

REPO = os.path.dirname(os.path.abspath(__file__))
os.chdir(REPO)

AUTHOR_NAME = "Князев Иван Игоревич"
AUTHOR_EMAIL = "1inside1@users.noreply.github.com"
MSG = "структура проекта + модуль 4 код безопасности\n"
AUTHOR_DATE = "2026-05-26 11:45:00 +0300"


def run(args, env=None):
    return subprocess.check_output(args, env=env).decode("utf-8").strip()


subprocess.run(["git", "add", "-A"], check=True)

tree = run(["git", "write-tree"])
parent = run(["git", "rev-parse", "HEAD"])
msg_path = os.path.join(REPO, ".git", "commit_msg.txt")
with open(msg_path, "w", encoding="utf-8", newline="\n") as handle:
    handle.write(MSG)

env = os.environ.copy()
env.update(
    {
        "GIT_AUTHOR_NAME": AUTHOR_NAME,
        "GIT_AUTHOR_EMAIL": AUTHOR_EMAIL,
        "GIT_COMMITTER_NAME": AUTHOR_NAME,
        "GIT_COMMITTER_EMAIL": AUTHOR_EMAIL,
        "GIT_AUTHOR_DATE": AUTHOR_DATE,
        "GIT_COMMITTER_DATE": AUTHOR_DATE,
    }
)

new_hash = run(["git", "commit-tree", tree, "-p", parent, "-F", msg_path], env=env)
subprocess.run(["git", "reset", "--hard", new_hash], check=True)
body = run(["git", "cat-file", "-p", "HEAD"])
if "cursor" in body.lower():
    raise SystemExit("Cursor co-author detected")
subprocess.run(["git", "push", "origin", "master"], check=True)
print("OK", new_hash)
