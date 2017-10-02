

#
# Get basic sentiment of some text
# Usage: python getSentiment.py FILE_NAME
#

import sys
import os
import string
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import RegexpTokenizer

src_file = os.path.dirname(os.path.realpath(__file__)) + '/' + sys.argv[1]
working_file = open(src_file, 'r')

result = 0
sid = SentimentIntensityAnalyzer()
tokenizer = RegexpTokenizer(r'\w+')
comment_counter = 0

for comment in working_file:

    # remove punctuation and tokenize
    tokens = tokenizer.tokenize(comment)

    if(len(tokens) > 0):
        # score the line
        ss = sid.polarity_scores(' '.join(tokens))

        result += ss['compound']
        comment_counter += 1


result = result/comment_counter

working_file.close()

print(result)
