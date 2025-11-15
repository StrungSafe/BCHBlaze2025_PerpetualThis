import { compileFile } from 'cashc';
import { writeFile } from 'fs';

const artifact = compileFile(new URL('perpetual.cash', import.meta.url));
writeFile('art/perpetual.json', JSON.stringify(artifact), error => {
    if(error) {
        throw error;
    }
});
