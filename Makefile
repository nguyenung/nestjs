start:
	docker-compose --env-file ./.env.dev -f docker-compose.dev.yml up -d

stop:
	docker-compose -f docker-compose.dev.yml kill

shell:
	docker-compose -f docker-compose.dev.yml exec nest_boilerplate /bin/sh