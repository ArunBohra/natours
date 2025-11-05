import { getEnv } from '@config/env';

import { initApi } from '@api/api';

const startServer = () => {
    try {
        const PORT = getEnv('PORT', '8000');

        const api = initApi();

        api.listen(PORT, () =>
            // eslint-disable-next-line no-console
            console.log(`Server is running on http://localhost:${PORT}`),
        );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('❌ Server failed to start:', error);
        process.exit(1);
    }
};

startServer();
