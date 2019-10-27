import { waitForConnection } from 'functions/utils/connection';
import { createConfigurations } from 'functions/InitializeDatabase/create-tables';
import { insertConfigurations } from 'functions/InitializeDatabase/seed-data';

(async () => {
    try {
        const pg = await waitForConnection();

        await createConfigurations(pg.schema);
        await insertConfigurations(pg);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    process.exit();
})();
