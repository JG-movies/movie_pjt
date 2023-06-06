import requests
import json


TMDB_API_KEY ='cec1ac30c15be1288013fffafcfe2c04'


def get_actor_datas():
    for i in range(1, 10):
        request_url = f"https://api.themoviedb.org/3/person/popular?api_key={TMDB_API_KEY}&language=ko-KR&page={i}"

        actors = requests.get(request_url).json()
        for actor in actors['results']:
            if actor.get('known_for_department', 'Acting'):
                fields = {
                    'id': actor['id'],
                    'name':actor['name'],
                    'profile_path':actor['']
                }

                data = {
                    "pk": actor['id'],
                    "model": "movies.actor",
                    "fields": fields
                }

                actor_list.append(data)

def credits(title):

    base_url = 'https://api.themoviedb.org/3/search/movie?api_key=2ee130f2ba9bf221b6fe5107cffcac46&language=ko&'
    search_url = 'query='+ str(title) + '&include_adult=true'
    url = base_url + search_url
    url_result = requests.get(url).json()

    base_url_2 = 'https://api.themoviedb.org/3/movie/'
    search_url_2 = str(url_result['results'][0]['id']) + '/credits?api_key=2ee130f2ba9bf221b6fe5107cffcac46&language=ko&'
    url_2 = base_url_2 + search_url_2
    url_result_2 = requests.get(url_2).json()

    result_2 = []
    for i in range(len(url_result_2['cast'])) :
        if url_result_2['cast'][i]['cast_id'] < 10:
            result_2.append(url_result_2['cast'][i]['id'])

    
    return result_2


movie_list = []
word_list = []

get_movie_datas()

get_word_datas()


for i in range(len(movie_list)):
    movie_list[i]['fields']['words'] = word_list[i]['fields']['words']
    actor_list = credits(movie_list[i]['fields']['title'])
    movie_list[i]['fields']['actors'] = actor_list

print(movie_list[0]['fields'])

file_path = "./moviedata.json"
with open(file_path, 'w',  encoding='UTF-8') as outfile:
    json.dump(movie_list, outfile, indent="\t", ensure_ascii=False)