const SIGNS = [-1, 1]

async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

const initialCurrenciesObject = {
  "BITCOIN": 16000,
  "ETHER": 513,
  "LITECOIN": 150,
  "NEO": 45,
  "COSMOS": 112
}

const getCurrenciesObject = () => {
  initialCurrenciesObject["BITCOIN"] += SIGNS[Math.floor(Math.random() * 2)] * Math.random() * 20
  initialCurrenciesObject["ETHER"] += SIGNS[Math.floor(Math.random() * 2)] * Math.random() * 10
  initialCurrenciesObject["LITECOIN"] += SIGNS[Math.floor(Math.random() * 2)] * Math.random() * 5
  initialCurrenciesObject["NEO"] += SIGNS[Math.floor(Math.random() * 2)] * Math.random() * 3
  initialCurrenciesObject["COSMOS"] += SIGNS[Math.floor(Math.random() * 2)] * Math.random() * 2
  return Object.assign({}, initialCurrenciesObject)
}

export const mockFetchCurrentRates = async () => {
    const randLatencyMS = Math.floor(Math.random() * 2000)
    await wait(randLatencyMS)
    return getCurrenciesObject()
}

export const mockRequestSell = async (type, amount) => {
  const randLatencyMS = Math.floor(Math.random() * 4000)
  await wait(randLatencyMS)
  
  return new Promise((resolve, reject) => {
    const rand = Math.random()
    const accepted = rand < 0.7
    if (accepted) resolve("sell request success")
    else reject("sell operation rejected by the server")
  })
}

export const mockRequestBuy = async (type, amount) => {
  const randLatencyMS = Math.floor(Math.random() * 4000)
  await wait(randLatencyMS)

  return new Promise((resolve, reject) => {
    const rand = Math.random()
    const accepted = rand < 0.7
    if (accepted) resolve("buy request success")
    else reject("buy operation rejected by the server")
  })
}