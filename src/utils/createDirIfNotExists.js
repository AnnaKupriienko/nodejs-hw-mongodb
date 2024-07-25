import fs from 'node:fs/promises';

export const createDirIfNotExists = async (dir) => {
    try {
        await fs.acces(dir);
    } catch (error) {
        if(error.code === 'ENOENT') {
            await fs.mkdir(dir);
        }
}
};
