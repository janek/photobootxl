restart:
	@sudo systemctl restart photobootxl.service

stop:
	@sudo systemctl stop photobootxl.service

state:
	@echo "Printing is $$(if [ \"x$${DISABLE_PRINT}\" = \"xtrue\" ]; then echo disabled; else echo enabled; fi), overlay is $$(if [ \"x$${DISABLE_OVERLAY}\" = \"xtrue\" ]; then echo disabled; else echo enabled; fi)."
