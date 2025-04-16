# Streaming Service - Frontend Challenge

> **Sobre**: Este projeto foi desenvolvido como solução para o desafio do módulo 7 do curso da **[Cubos Academy](https://cubos.academy/)**, simulando um serviço de streaming (Netflix-like) com integração à API do TMDB.

<img src="https://i.imgur.com/xG74tOh.png" alt="Preview do projeto" width="600"/>

## 🚀 Funcionalidades Implementadas
- [x] Catálogo de filmes com paginação
- [x] Busca dinâmica por título
- [x] Destaque do "Filme do Dia"
- [x] Modal detalhado ao clicar em um filme
- [x] Toggle entre temas light/dark
- [x] Design responsivo conforme [Figma original](https://www.figma.com/file/AL6hZ3Lq16Uj8mw1o4BzAK/Desafio-front-academy-2)

# Desafio | Front-end - Módulo 7

Você acabou de ser contratado pela melhor empresa de tecnologia do mundo: a **CUBOS**.
Sua primeira tarefa como desenvolvedor é criar uma aplicação para um serviço de streaming (pense num Netflix).

Seu papel é construir um website com [o seguinte design](https://www.figma.com/file/AL6hZ3Lq16Uj8mw1o4BzAK/Desafio-front-academy-2?node-id=0%3A1) que permita: (funcionalidades com \* ao lado são obrigatórias)

# Caso tenha problema em abrir o arquivo pelo figma, utilize pelo [penpot](https://design.penpot.app/#/view/c11b456c-633e-8059-8004-b4d335177746?page-id=c11b456c-633e-8059-8004-b4d33f440a69&section=interactions&index=0&share-id=ad45735f-43aa-8114-8004-b4d628faed5b)

# Caso tenha problema em abrir o arquivo pelo figma, utilize pelo [penpot versão modo escuro](https://design.penpot.app/#/view/c11b456c-633e-8059-8004-b4d4261812b0?page-id=c11b456c-633e-8059-8004-b4d42a9f4a68&section=interactions&index=0&share-id=ab27a21c-afea-8070-8004-b4d640cbda42)

- Visualização de filmes (\*)
- Paginação de filmes (\*)
- Busca de filmes (\*)
- "Filme do dia" (\*)
- Modal de filme (\*)
- Mudança de tema (dark ou light)

Os dados do website serão requisitados da [seguinte API](https://tmdb-proxy.cubos-academy.workers.dev)

## Detalhamentos de Requisitos

### Visualização de filmes

Assim que o website for aberto, a listagem de filmes deverá ser preenchida com as informações do [seguinte endpoint](https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false)

Exemplo de retorno:

```json
{
  "results": [
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/original/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg",
      "genre_ids": [28, 12, 14],
      "id": 436969,
      "original_language": "en",
      "original_title": "The Suicide Squad",
      "overview": "Os supervilões Harley Quinn (Margot Robbie), Bloodsport (Idris Elba), Peacemaker (John Cena) e uma coleção de malucos condenados da prisão de Belle Reve juntam-se à super-secreta e super-obscura Força Tarefa X, enquanto são deixados na remota ilha de Corto Maltese para combater o inimigo.",
      "popularity": 6294.822,
      "poster_path": "https://image.tmdb.org/t/p/original/wTS3dS2DJiMFFgqKDz5fxMTri.jpg",
      "release_date": "2021-07-28",
      "title": "O Esquadrão Suicida",
      "video": false,
      "vote_average": 8.1,
      "vote_count": 2435,
      "price": 10
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/original/7WJjFviFBffEJvkAms4uWwbcVUk.jpg",
      "genre_ids": [12, 14, 35, 28],
      "id": 451048,
      "original_language": "en",
      "original_title": "Jungle Cruise",
      "overview": "O destemido capitão Frank Wolff e a intrépida pesquisadora Lily Houghton se aventuram pela Amazônia a bordo da peculiar embarcação La Quila. Determinados a encontrar uma árvore cujos poderes de cura podem mudar o futuro da medicina, nem mesmo as águas perigosas e as forças sobrenaturais que enfrentam pelo caminho poderão detê-los. Mas os riscos aumentam ainda mais conforme os segredos da árvore se revelam, o destino de Lily e Frank e também de toda a humanidade está em jogo.",
      "popularity": 5788.065,
      "poster_path": "https://image.tmdb.org/t/p/original/9E76j2DcQv8LdbX1Wa9jpbDBfw1.jpg",
      "release_date": "2021-07-28",
      "title": "Jungle Cruise",
      "video": false,
      "vote_average": 7.9,
      "vote_count": 1801,
      "price": 3.5
    }
  ]
}
```

A estrutura HTML deverá ser a seguinte:
![](https://i.imgur.com/s8j6m3E.png)

Informações do retorno da API necessárias para o preenchimento:

- background-image da `<div class="movie">` === poster_path
- texto do `<span class="movie__title">` === title
- texto do `<span class="movie__rating">` === vote_average

Essa estrutura terá que ser criada para **cada filme** poderá ser construida dinamicamente pela DOM, porém, isso **não é obrigatório**.

Cada filme deverá ser colocado dentro da `<div class="movies">`

### Paginação de filmes

Você poderá assumir que sempre existirão 4 páginas (0, 1, 2, 3) por conta do número de filmes em média ser 20 e, seu website sempre irá mostrar no máximo 5 por vez.

O `<button class="btn-prev">`, quando clicado, se não estiver na página 0, terá que voltar 1 página, se não, levará o usuário para a página 3
O `<button class="btn-next">`, quando clicado, se não estiver na página 3, terá que avançar 1 página, se não, levará o usuário para a página 0

Ao voltar ou avançar uma página, os filmes em tela serão atualizados corretamente.

### Busca de filmes

O usuário poderá buscar um filme por meio do `<input class="input">`

Quando o usuário pressionar a tecla "Enter" enquanto estiver com foco no input, algumas coisas teram que acontecer:

- O usuário terá que ser levado para a página 0
- Se o input possuir algum valor, você deverá realizar uma busca [no endpoint](https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false) passando um parametro de query "query" com o valor do input. Ex: Buscando por Matrix https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false**&query=Matrix**
- Se o input não possuir valor nenhum, você deverá realizar a mesma busca que é feita para preencher os filmes iniciais (Visualização de filmes)
- O valor do input terá que ser limpo

### "Filme do dia"

Assim que o website for aberto, o filme do dia deverá ser preenchido com as informações do [endpoint geral](https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR) e do [endpoint de videos](https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR);

Exemplo de retorno:

**Endpoint Geral**

```json
{
  "adult": false,
  "backdrop_path": "https://image.tmdb.org/t/p/original/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg",
  "belongs_to_collection": {
    "id": 531242,
    "name": "Suicide Squad Collection",
    "poster_path": "https://image.tmdb.org/t/p/original/bdgaCpdDh0J0H7ZRpDP2NJ8zxJE.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/e0uUxFdhdGLcvy9eC7WlO2eLusr.jpg"
  },
  "budget": 180000000,
  "genres": [
    {
      "id": 28,
      "name": "Ação"
    },
    {
      "id": 12,
      "name": "Aventura"
    },
    {
      "id": 14,
      "name": "Fantasia"
    }
  ],
  "homepage": "https://www.thesuicidesquad.net",
  "id": 436969,
  "imdb_id": "tt6334354",
  "original_language": "en",
  "original_title": "The Suicide Squad",
  "overview": "Os supervilões Harley Quinn (Margot Robbie), Bloodsport (Idris Elba), Peacemaker (John Cena) e uma coleção de malucos condenados da prisão de Belle Reve juntam-se à super-secreta e super-obscura Força Tarefa X, enquanto são deixados na remota ilha de Corto Maltese para combater o inimigo.",
  "popularity": 6294.822,
  "poster_path": "https://image.tmdb.org/t/p/original/wTS3dS2DJiMFFgqKDz5fxMTri.jpg",
  "production_companies": [
    {
      "id": 9993,
      "logo_path": "https://image.tmdb.org/t/p/original/2Tc1P3Ac8M479naPp1kYT3izLS5.png",
      "name": "DC Entertainment",
      "origin_country": "US"
    },
    {
      "id": 128064,
      "logo_path": "https://image.tmdb.org/t/p/original/13F3Jf7EFAcREU0xzZqJnVnyGXu.png",
      "name": "DC Films",
      "origin_country": "US"
    },
    {
      "id": 507,
      "logo_path": "https://image.tmdb.org/t/p/original/z7H707qUWigbjHnJDMfj6QITEpb.png",
      "name": "Atlas Entertainment",
      "origin_country": "US"
    },
    {
      "id": 429,
      "logo_path": "https://image.tmdb.org/t/p/original/2Tc1P3Ac8M479naPp1kYT3izLS5.png",
      "name": "DC Comics",
      "origin_country": "US"
    },
    {
      "id": 11565,
      "logo_path": null,
      "name": "The Safran Company",
      "origin_country": "US"
    },
    {
      "id": 174,
      "logo_path": "https://image.tmdb.org/t/p/original/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
      "name": "Warner Bros. Pictures",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2021-07-28",
  "revenue": 118084747,
  "runtime": 132,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    },
    {
      "english_name": "Spanish",
      "iso_639_1": "es",
      "name": "Español"
    }
  ],
  "status": "Released",
  "tagline": "Eles estão loucos... para salvar o mundo.",
  "title": "O Esquadrão Suicida",
  "video": false,
  "vote_average": 8.1,
  "vote_count": 2469
}
```

**Endpoint de videos**

```json
{
  "id": 436969,
  "results": [
    {
      "iso_639_1": "pt",
      "iso_3166_1": "BR",
      "name": "O Esquadrão Suicida | Trailer Oficial | Legendado",
      "key": "VO_oW4GDy7o",
      "site": "YouTube",
      "size": 1080,
      "type": "Trailer",
      "official": false,
      "published_at": "2021-03-26T17:12:53.000Z",
      "id": "605e1ae71065d3003d9a23f7"
    },
    {
      "iso_639_1": "pt",
      "iso_3166_1": "BR",
      "name": "O Esquadrão Suicida - Trailer Restrito Oficial",
      "key": "Ch6DQDFbovI",
      "site": "YouTube",
      "size": 1080,
      "type": "Trailer",
      "official": true,
      "published_at": "2021-03-26T16:00:03.000Z",
      "id": "605e0aea8c31590029451a47"
    }
  ]
}
```

A estrutura HTML deverá ser a seguinte:
![](https://i.imgur.com/72ixMvR.png)

Informações do retorno do **Endpoint Geral** necessárias para o preenchimento:

- background-image da `<div class="highlight__video">` === backdrop_path
- texto do `<h3 class="highlight__title">` === title
- texto do `<span class="highlight__rating">` === vote_average
- texto do `<span class="highlight__genres">` === genres (como genres é um array de objetos, você deverá criar uma string concatenando todos os valores de genre.name e separando-os por vírgula)
- texto do `<span class="highlight__launch">` === release_date (como release_date é uma data, você **poderá** transforma-lá em outro formato)
- texto do `<p class="highlight__description">` === overview

Informações do retorno do **Endpoint de vídeos** necessárias para o preenchimento:

- href do `<a class="highlight__video-link">` === concatene a string "https://www.youtube.com/watch?v=" com o valor de **key** (como o Endpoint de vídeos retorna um array, você deverá pegar o valor de **key** do primeiro item)

### Modal de filme

Ao clicar na `<div class="movie">` a `<div class="modal hidden">` deverá perder a classe "hidden" (isso irá **abrir** o modal)

Assim que o modal for **aberto**, ele deverá ser preenchido com as informações do [seguinte endpoint](https://tmdb-proxy.cubos-academy.workers.dev/3/movie/?language=pt-BR) passando um parametro de rota com o valor do **id** do filme. Ex: Buscando pelo filme com id 436969 https://tmdb-proxy.cubos-academy.workers.dev/3/movie/**436969**?language=pt-BR

O modal poderá ser "fechado" por meio de um clique nele próprio ou na `<img class="modal__close">`, ao clicar em qualquer um dos dois, a classe "hidden" deverá ser adicionada a `<div class="modal">`

Exemplo de retorno:

```json
{
  "adult": false,
  "backdrop_path": "https://image.tmdb.org/t/p/original/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg",
  "belongs_to_collection": {
    "id": 531242,
    "name": "Suicide Squad Collection",
    "poster_path": "https://image.tmdb.org/t/p/original/bdgaCpdDh0J0H7ZRpDP2NJ8zxJE.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/e0uUxFdhdGLcvy9eC7WlO2eLusr.jpg"
  },
  "budget": 180000000,
  "genres": [
    {
      "id": 28,
      "name": "Ação"
    },
    {
      "id": 12,
      "name": "Aventura"
    },
    {
      "id": 14,
      "name": "Fantasia"
    }
  ],
  "homepage": "https://www.thesuicidesquad.net",
  "id": 436969,
  "imdb_id": "tt6334354",
  "original_language": "en",
  "original_title": "The Suicide Squad",
  "overview": "Os supervilões Harley Quinn (Margot Robbie), Bloodsport (Idris Elba), Peacemaker (John Cena) e uma coleção de malucos condenados da prisão de Belle Reve juntam-se à super-secreta e super-obscura Força Tarefa X, enquanto são deixados na remota ilha de Corto Maltese para combater o inimigo.",
  "popularity": 6294.822,
  "poster_path": "https://image.tmdb.org/t/p/original/wTS3dS2DJiMFFgqKDz5fxMTri.jpg",
  "production_companies": [
    {
      "id": 9993,
      "logo_path": "https://image.tmdb.org/t/p/original/2Tc1P3Ac8M479naPp1kYT3izLS5.png",
      "name": "DC Entertainment",
      "origin_country": "US"
    },
    {
      "id": 128064,
      "logo_path": "https://image.tmdb.org/t/p/original/13F3Jf7EFAcREU0xzZqJnVnyGXu.png",
      "name": "DC Films",
      "origin_country": "US"
    },
    {
      "id": 507,
      "logo_path": "https://image.tmdb.org/t/p/original/z7H707qUWigbjHnJDMfj6QITEpb.png",
      "name": "Atlas Entertainment",
      "origin_country": "US"
    },
    {
      "id": 429,
      "logo_path": "https://image.tmdb.org/t/p/original/2Tc1P3Ac8M479naPp1kYT3izLS5.png",
      "name": "DC Comics",
      "origin_country": "US"
    },
    {
      "id": 11565,
      "logo_path": null,
      "name": "The Safran Company",
      "origin_country": "US"
    },
    {
      "id": 174,
      "logo_path": "https://image.tmdb.org/t/p/original/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
      "name": "Warner Bros. Pictures",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2021-07-28",
  "revenue": 118084747,
  "runtime": 132,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    },
    {
      "english_name": "Spanish",
      "iso_639_1": "es",
      "name": "Español"
    }
  ],
  "status": "Released",
  "tagline": "Eles estão loucos... para salvar o mundo.",
  "title": "O Esquadrão Suicida",
  "video": false,
  "vote_average": 8.1,
  "vote_count": 2469
}
```

A estrutura HTML deverá ser a seguinte:
![](https://i.imgur.com/quJYytr.png)

Informações do retorno da API necessárias para o preenchimento:

- texto do `<h3 class="modal__title">` === title
- src da `<img class="modal__img">` === backdrop_path
- texto do `<p class="modal__description">` === overview
- texto da `<div class="modal__average">` === vote_average
- **ISSO NÃO É OBRIGATÓRIO**
  - para cada genre, você deverá criar um `<span class="modal__genre">`, colocar como texto o valor de genre.name e adicioná-lo na `<div class="modal__genres">`

### Mudança de tema **NÃO OBRIGATÓRIO**

Ao clicar na `<img class="btn-theme">`, caso o **tema atual** seja "light" ou "claro", o mesmo deverá ser trocado para o tema "dark" ou "escuro", após isso, você deverá modificar o tema (imagens e cores) do seu website de acordo com o Figma. Essa troca de tema, poderá ser facilitada caso seja feita por meio da troca de variáveis CSS.

## Aulas úteis:

- [Conhecendo DOM](https://aulas.cubos.academy/turma/ff0375b6-f139-4b45-b216-a2fd58f3a5db/aulas/3862927b-d258-41e3-a9a0-44409a58755a)
- [Eventos da DOM](https://aulas.cubos.academy/turma/ff0375b6-f139-4b45-b216-a2fd58f3a5db/aulas/49c4ade0-f0dd-4f1d-b2f7-6ceecb1ea02b)
- [Manipulando DOM](https://aulas.cubos.academy/turma/ff0375b6-f139-4b45-b216-a2fd58f3a5db/aulas/c6846ed3-8821-4e20-a9d5-d816ff9fda91)
- [API pt1](https://aulas.cubos.academy/turma/ff0375b6-f139-4b45-b216-a2fd58f3a5db/aulas/8925d021-a823-44aa-9aae-8706b5156b63)
- [API pt2](https://aulas.cubos.academy/turma/ff0375b6-f139-4b45-b216-a2fd58f3a5db/aulas/4aee2a70-1ea2-4ffc-90d4-44f1df5381d8)

**LEMBRE-SE**: Feito é melhor do que perfeito, mas não faça mal feito!!!

###### tags: `front-end` `módulo 7` `HTML` `DOM` `CSS` `desafio`
