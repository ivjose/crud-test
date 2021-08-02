/* eslint-disable import/prefer-default-export */
import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:3030/movies', (req, res, ctx) => {
    const query = req.url.searchParams
    const active = query.get('active')
    const search = query.get('q')

    if (active === 'true') {
      return res(
        ctx.json([
          {
            id: 1,
            name: 'The Tomorrow War',
            active: true,
            description:
              'The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians from the present to be transported to the future and join the fight. Among those recruited is high school teacher and family man Dan Forester. Determined to save the world for his young daughter, Dan teams up with a brilliant scientist and his estranged father in a desperate quest to rewrite the fate of the planet.',
            category: 'fantasy',
          },
          {
            id: 2,
            name: 'Dirty Grandpa',
            active: true,
            description:
              "Jason Kelly is one week away from marrying his boss's uber-controlling daughter, putting him on the fast track for a partnership at the law firm. However, when the straight-laced Jason is tricked into driving his foul-mouthed grandfather, Dick, to Daytona for spring break, his pending nuptials are suddenly in jeopardy. Between riotous frat parties, bar fights, and an epic night of karaoke, Dick is on a quest to live his life to the fullest and bring Jason along for the ride.",
            category: 'comedy',
          },
        ])
      )
    }

    if (active === 'false') {
      return res(
        ctx.json([
          {
            id: 3,
            name: 'Love, Rosie',
            active: false,
            description:
              'Since the moment they met at age 5, Rosie and Alex have been best friends, facing the highs and lows of growing up side by side. A fleeting shared moment, one missed opportunity, and the decisions that follow send their lives in completely different directions. As each navigates the complexities of life, love, and everything in between, they always find their way back to each other - but is it just friendship, or something more?',
            category: 'drama',
          },
        ])
      )
    }

    if (search) {
      return res(
        ctx.json([
          {
            id: 1,
            name: 'The Tomorrow War',
            active: true,
            description:
              'The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians from the present to be transported to the future and join the fight. Among those recruited is high school teacher and family man Dan Forester. Determined to save the world for his young daughter, Dan teams up with a brilliant scientist and his estranged father in a desperate quest to rewrite the fate of the planet.',
            category: 'fantasy',
          },
        ])
      )
    }

    return res(
      ctx.json([
        {
          id: 1,
          name: 'The Tomorrow War',
          active: true,
          description:
            'The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians from the present to be transported to the future and join the fight. Among those recruited is high school teacher and family man Dan Forester. Determined to save the world for his young daughter, Dan teams up with a brilliant scientist and his estranged father in a desperate quest to rewrite the fate of the planet.',
          category: 'fantasy',
        },
        {
          id: 2,
          name: 'Dirty Grandpa',
          active: true,
          description:
            "Jason Kelly is one week away from marrying his boss's uber-controlling daughter, putting him on the fast track for a partnership at the law firm. However, when the straight-laced Jason is tricked into driving his foul-mouthed grandfather, Dick, to Daytona for spring break, his pending nuptials are suddenly in jeopardy. Between riotous frat parties, bar fights, and an epic night of karaoke, Dick is on a quest to live his life to the fullest and bring Jason along for the ride.",
          category: 'comedy',
        },
        {
          id: 3,
          name: 'Love, Rosie',
          active: false,
          description:
            'Since the moment they met at age 5, Rosie and Alex have been best friends, facing the highs and lows of growing up side by side. A fleeting shared moment, one missed opportunity, and the decisions that follow send their lives in completely different directions. As each navigates the complexities of life, love, and everything in between, they always find their way back to each other - but is it just friendship, or something more?',
          category: 'drama',
        },
      ])
    )
  }),

  rest.delete('http://localhost:3030/movies/:moviesId', (req, res, ctx) => {
    return res(ctx.json({}))
  }),

  rest.get('http://localhost:3030/category', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: 'Action',
        },
        {
          id: 2,
          name: 'Comedy',
        },
        {
          id: 3,
          name: 'Drama',
        },
        {
          id: 4,
          name: 'Fantasy',
        },
        {
          id: 5,
          name: 'Horror',
        },
        {
          id: 6,
          name: 'Mystery',
        },
        {
          id: 6,
          name: 'Thriller',
        },
      ])
    )
  }),

  rest.post('http://localhost:3030/movies', (req, res, ctx) => {
    return res(ctx.json({}))
  }),

  rest.get('http://localhost:3030/movies/2', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 2,
        name: 'Dirty Grandpa',
        active: true,
        description: 'Short description',
        category: 'comedy',
      })
    )
  }),

  rest.put('http://localhost:3030/movies/2', (req, res, ctx) => {
    return res(ctx.json({}))
  }),

  rest.delete('http://localhost:3030/movies/2', (req, res, ctx) => {
    return res(ctx.json({}))
  }),
]

// const q = req.url.searchParams.get('q')
