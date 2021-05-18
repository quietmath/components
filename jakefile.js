//eslint-disable-next-line @typescript-eslint/no-var-requires
const { desc, task } = require('jake');
//eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');

desc('Task to copy JS files.');
task('copy-js', async () => {
    try {
        await fs.copy(`${ __dirname }/dist`, `${ __dirname }/examples/dist`, { overwrite: true, recursive: true });
    }
    catch(err) {
        console.error(`Failed to copy directory. ${ err }`);
    }
});
