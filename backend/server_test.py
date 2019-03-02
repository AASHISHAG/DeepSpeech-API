import subprocess
import uuid
import scipy.io.wavfile
from deepspeech import Model
from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin

BEAM_WIDTH = 1024
LM_WEIGHT = 0.75
VALID_WORD_COUNT_WEIGHT = 1.85
N_FEATURES = 26
N_CONTEXT = 9
MODEL_FILE = 'models/output_graph.pbmm'
ALPHABET_FILE = 'models/alphabet.txt'
LANGUAGE_MODEL =  'models/lm.binary'
TRIE_FILE =  'models/trie'

ds = Model(MODEL_FILE, N_FEATURES, N_CONTEXT, ALPHABET_FILE, BEAM_WIDTH)
ds.enableDecoderWithLM(ALPHABET_FILE, LANGUAGE_MODEL, TRIE_FILE, LM_WEIGHT, VALID_WORD_COUNT_WEIGHT)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['POST'])
@cross_origin()
def post():
    fileName = 'file_'+str(uuid.uuid4())+'.wav'
    with open(fileName, "wb") as vid:
        vid.write(request.data)

    fs, audio = scipy.io.wavfile.read(fileName)
    processed_data = ds.stt(audio, fs)

    # proc = subprocess.Popen(
    #     "deepspeech --model models/output_graph.pbmm --alphabet models/alphabet.txt --lm models/lm.binary --trie models/trie --audio fileName",
    #     shell=True, stdout=subprocess.PIPE, )
    # output = proc.communicate()[0]
    # print(output)

    print(processed_data)

    return jsonify(
        username=processed_data
    )

@app.route('/file', methods=['POST'])
@cross_origin()
def post1():
    fileName = 'file_'+str(uuid.uuid4())+'.wav'
    with open(fileName, "wb") as vid:
        vid.write(request.data)

    fs, audio = scipy.io.wavfile.read(fileName)
    processed_data = ds.stt(audio, fs)

    # proc = subprocess.Popen(
    #     "deepspeech --model models/output_graph.pbmm --alphabet models/alphabet.txt --lm models/lm.binary --trie models/trie --audio fileName",
    #     shell=True, stdout=subprocess.PIPE, )
    # output = proc.communicate()[0]

    print(processed_data)

    return jsonify(
	username=processed_data
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80,debug=True)