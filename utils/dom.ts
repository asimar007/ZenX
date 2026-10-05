export function extractTweetText(tweetElement: HTMLElement): string {
  const tweetTextEl = tweetElement.querySelector('[data-testid="tweetText"]');
  let text = tweetTextEl ? (tweetTextEl as HTMLElement).innerText : '';

  const quotedTweet = tweetElement.querySelector('[data-testid="quoteTweet"]');
  if (quotedTweet) {
    const quotedText = quotedTweet.querySelector('[data-testid="tweetText"]');
    if (quotedText) text += ' ' + (quotedText as HTMLElement).innerText;
  }

  const cardText = tweetElement.querySelector('[data-testid="card.wrapper"]');
  if (cardText) text += ' ' + (cardText as HTMLElement).innerText;

  return text.trim();
}

export function el(tag: string, className: string, text?: string): HTMLElement {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
