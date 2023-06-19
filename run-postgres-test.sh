docker-compose -f docker-compose.test.yml up -d
sleep 10s
npm run mig:test:run
