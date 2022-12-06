# Datas fina nya hemsida

[![dhack banner](https://static.codegrotto.com/images/dhack-banner.svg)](dhack.se)

## Background

För länge sedan på en hörsalsväg långt långt borta, på ett extra tråkigt sektionsmöte så fick Cral en ide! "Fy va ful våran hemsida e! Lite webdev har aldrig skadat någon", sa en naiv Cral. Efter mycket möda och gott besvär så har vi en marginellt bättre hemsida. (Tetris säljes separat)

## Development

Klona repot och installera dependencies med `pnpm install`

```bash
# Clone the repo
git clone git@github.com:Malmz/dtek-se.git

# Install dependencies
pnpm install

# Start the dev server
pnpm run dev
```

## Release

Github actions bygger automatisk en docker image när en tag skapas med formatet `vX.Y.Z`.
