init:
	git config core.hooksPath .githooks
	chmod +x .githooks/commit-msg
	git update-index --chmod=+x .githooks/commit-msg
