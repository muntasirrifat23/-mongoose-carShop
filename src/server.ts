import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/test');
    await mongoose.connect(config.db_url as string);

    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
