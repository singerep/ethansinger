DATE := $(shell date +%Y-%m-%d)

.SILENT: page
page:
	Node tools/createPage.cjs