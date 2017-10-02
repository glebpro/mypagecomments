

#
# Count number of nouns in a plaintext s3 file.
# Usage: pyhon countWords.py BUCKET_NAME FILE_NAME
#

import sys
import os
import boto3
import nltk

bucketName = sys.argv[1]
srcFileName = sys.argv[2]
curr_dir_path = os.path.dirname(os.path.realpath(__file__))
destFileName = curr_dir_path + '/' + sys.argv[2]

session = boto3.Session(profile_name='default')
s3_client = session.client('s3')

s3_client.download_file(bucketName, srcFileName, destFileName)

working_file = open(destFileName, 'r')
result = 0

for line in working_file:
    line = line.strip()
    if(len(line) > 0):
        tokens = nltk.word_tokenize(line)
        tagged = nltk.pos_tag(tokens)
        nouns = [ a for (a, b) in tagged if b == 'NN']
        result += len(nouns)

working_file.close()

os.remove(destFileName)

print(result)
