// Also add nb_threads parameter : the number of threads in the given tweet

export function genAnalytics(text: string) {

  // works for english, need to adjust for other languages
  const to_keep = "abcdefghijklmnopqrstuvwxyz0123456789 ";
  const common_words = ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "aint", "arent", "cant", "couldve", "couldnt", "didnt", "doesnt", "dont", "hasnt", "hed", "hell", "hes", "howd", "howll", "hows", "id", "ill", "im", "ive", "isnt", "its", "mightve", "mightnt", "mustve", "mustnt", "shant", "shed", "shell", "shes", "shouldve", "shouldnt", "thatll", "thats", "theres", "theyd", "theyll", "theyre", "theyve", "wasnt", "wed", "well", "were", "werent", "whatd", "whats", "whend", "whenll", "whens", "whered", "wherell", "wheres", "whod", "wholl", "whos", "whyd", "whyll", "whys", "wont", "wouldve", "wouldnt", "youd", "youll", "youre", "youve"];
  let word_count: { [key: string]: number } = {};
  let top_words: string[] = [];

  let lowered_text = text.toLowerCase();
  let formatted_text = "";

  for(const char of lowered_text) {
    if(to_keep.includes(char)) {
      formatted_text += char;
    }
    // If an escaping char is found, replace it with a space if there is not already a space right before
    else if(char === "\n" && formatted_text[formatted_text.length - 1] !== " ") {
      formatted_text += " ";
    }
  }

  let word_list = formatted_text.split(" ");

  // Fills the word frequency dict
  for(const word of word_list) {

    if(!common_words.includes(word)) {
      if(word in word_count) {
        word_count[word] += 1;
      }
      else {
        word_count[word] = 1;
      }
    }
  }

  // Takes the top 5 words of the frequency dict
  for(const key in word_count) {
    if(top_words.length < 5) {
      top_words.push(key);
    }
    else {
      for(let i = 0; i < top_words.length; i++) {
        const other = top_words[i];
        if(word_count[other] < word_count[key]) {
          top_words[i] = key;
          break;
        }
      }
    }
  }

  return top_words;
}
