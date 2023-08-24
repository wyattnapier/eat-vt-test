import React, { useEffect, useState } from 'react';
import fs from 'fs';
import mic from 'mic';
import { Readable } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { OpenAI } from 'openai';
import dotenv from 'react-dotenv';

ffmpeg.setFfmpegPath(ffmpegPath.path);

dotenv.configure();

console.log(process.env.CREATE_REACT_API_KEY)

const WhisperTranscription = () => {
  const [transcription, setTranscription] = useState('');
  const [completionOutput, setCompletionOutput] = useState('');

  useEffect(() => {
    const createTranscription = async () => {
      try {
        const openai = new OpenAI({
          apiKey: process.env.CREATE_REACT_API_KEY,
        });

        const audioFilename = 'recorded_audio.wav';

        const recordAudio = (filename) => {
          return new Promise((resolve, reject) => {
            const micInstance = mic({
              rate: '16000',
              channels: '1',
              fileType: 'wav',
            });

            const micInputStream = micInstance.getAudioStream();
            const output = fs.createWriteStream(filename);
            const writable = new Readable().wrap(micInputStream);

            console.log('Recording... Press Ctrl+C to stop.');

            writable.pipe(output);

            micInstance.start();

            process.on('SIGINT', () => {
              micInstance.stop();
              console.log('Finished recording');
              resolve();
            });

            micInputStream.on('error', (err) => {
              reject(err);
            });
          });
        };

        const transcribeAudio = async (filename) => {
          const response = await openai.audio.transcriptions.create({
            model: 'whisper-1',
            file: fs.createReadStream(filename),
          });
          return response.data[0].text;
        };

        const createCompletion = async (transcribedInput) => {
          const completion = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: transcribedInput,
            max_tokens: 30,
          });
          console.log(completion.choices[0].text);
          return completion.choices[0].text;
        };

        await recordAudio(audioFilename);
        const transcribedText = await transcribeAudio(audioFilename);
        setTranscription(transcribedText);

        const completionResponse = await createCompletion(transcribedText);
        setCompletionOutput(completionResponse);

        // Additional steps or integration with other components can be added here
      } catch (error) {
        console.error('Error:', error);
      }
    };

    createTranscription();
  }, []);

  return (
    <div>
      <h2>Transcription:</h2>
      <p>{transcription}</p>
      <h2>Completion Output:</h2>
      <p>{completionOutput}</p>
    </div>
  );
};

export default WhisperTranscription;