const crumbs = (json) => {
  const homeLink = `<a href="/"><svg xmlns="http://www.w3.org/2000/svg" class="fill-zinc-300 w-4 sm:w-5 lg:w-6" viewBox="0 0 24 24"><path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 8 21 C 8.552 21 9 20.552 9 20 L 9 14 L 15 14 L 15 20 C 15 20.552 15.448 21 16 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 19 7.7851562 L 19 5 C 19 4.448 18.552 4 18 4 C 17.448 4 17 4.448 17 5 L 17 6.0390625 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z" /></svg></a>`
  const jsonLinks = json.map((link, idx, arr) => {
    return `<a class="block ${idx === arr.length - 1 ? 'font-df-sans mt-1' : ''}" href="${link.url}">${link.crumb ? link.crumb : link.title}</a>`
  })

  return `<div class="text-sm sm:text-base lg:text-xl text-zinc-300 font-df leading-4 font-medium uppercase flex items-center">${[homeLink, ...jsonLinks].join('<div class="mx-1 text-base lg:text-lg leading-3">&rarrw;</div>')}</div>`
}

module.exports = crumbs
