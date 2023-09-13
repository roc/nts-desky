import { decode } from "html-entities";

const decoded = (htmlString: string) => decode(htmlString);

export default decoded;
