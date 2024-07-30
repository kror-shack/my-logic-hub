import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { transformSymbolsForUrl } from "../tranfromSymbols/transformSymbols";

export function setUrl(
  propositionArr: string[] | string,
  pathName: string,
  router: AppRouterInstance
) {
  let urlTransform;
  if (Array.isArray(propositionArr))
    urlTransform = propositionArr.map(transformSymbolsForUrl);
  else urlTransform = transformSymbolsForUrl(propositionArr);
  const url = `${pathName}?argument=${encodeURI(JSON.stringify(urlTransform))}`;
  router.push(url);
}
