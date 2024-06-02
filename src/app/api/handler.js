import {Configuration, OpenAIAPI} from 'openai';
import {writeFileSync} from 'fs';
import { fetch } from 'openai/_shims/fetch';

const configuration = new Configuration({
  apiKey: 'my-api-key',
});

const openai = new OpenAIAPI(configuration);

const prompt = "Astronaut kicks a ball on the beach";

const result = await openai.createImage({
  prompt,
  n: 1,
  size: "1024x1024",
  user: "eliyashlomo7@gmail.com"
});

const url =result.data.data[0].url;
console.log(url);

//save url on disc
const imaResult = await fetch(url);
const blob = await imaResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(`./img${Date.now()}.png`,buffer);




