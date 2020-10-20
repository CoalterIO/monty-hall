dev:
	ng serve --proxy-config proxy.config.json

prod:
	ng build --prod --output-path docs --base-href /monty-hall/