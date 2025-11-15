import { compileFile } from 'cashc';
import { writeFile } from 'fs';

const artifact = compileFile(new URL('perpetual.cash', import.meta.url));
writeFile('src/art/perpetual.cashc', JSON.stringify(artifact), error => {
    if(error) {
        throw error;
    }
});
