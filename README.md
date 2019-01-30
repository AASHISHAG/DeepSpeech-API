# DeepSpeech-API

Project [DeepSpeech](https://github.com/mozilla/DeepSpeech) is an open source Speech-To-Text engine, using a model trained by machine learning techniques, based on [Baidu's Deep Speech research paper](https://arxiv.org/abs/1412.5567). Project DeepSpeech uses Google's [TensorFlow](https://www.tensorflow.org/) project to make the implementation easier.

#### Installing DeepSpeech Python bindings

```
$ pip3 install deepspeech
```

## Getting the pre-trained model

If you want to use the pre-trained English model for performing speech-to-text, you can download it (along with other important inference material) from the [DeepSpeech releases page](https://github.com/mozilla/DeepSpeech/releases). Alternatively, you can run the following command to download and unzip the files in your current directory:

```bash
wget -O - https://github.com/mozilla/DeepSpeech/releases/download/v0.3.0/deepspeech-0.3.0-models.tar.gz | tar xvfz -
```

![alt text](https://github.com/AASHISHAG/DeepSpeech-API/blob/master/images/deepSpeech-api.JPG)
