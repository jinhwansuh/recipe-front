import { IngredientInput } from '~/types/recipe';

const DEFAULT_YOUTUBE_URL_Id = '5FpmyEp7QFk';

export const convertIngredientsToString = (
  ingredients: IngredientInput[],
): string => {
  return ingredients
    .reduce((acc, curr) => {
      const { name, weigh, selected } = curr;
      return `${acc},${name}:${weigh}${selected}`;
    }, '')
    .slice(1);
};

export const getYoutubeVideoId = (videoURL: string): string => {
  const [_, id] = videoURL.split('?v=');
  if (id) return id;
  return DEFAULT_YOUTUBE_URL_Id;
};

export const getYoutubeThumbnail = (videoURL: string): string => {
  const id = getYoutubeVideoId(videoURL);
  return `https://img.youtube.com/vi/${id}/0.jpg`;
};

export const getYoutubeEmbedURL = (videoURL: string): string => {
  const id = getYoutubeVideoId(videoURL);
  return `https://www.youtube.com/embed/${id}`;
};

export const getIngredientArray = (ingredientArray: string): string[][] => {
  return ingredientArray
    .split(',')
    .map((el) => el.split(':'))
    .map((el) => [
      el[0],
      el[1].replace(/[^0-9]/g, ''),
      el[1].replace(/[0-9]/gi, ''),
    ]);
};
