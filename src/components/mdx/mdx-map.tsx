import CodeBlock from "./CodeBlock";
import ConsCard from "./ConsCard";
import HighlightText from "./HighlightText";
import ProsCard from "./ProsCard";
import Step from "./Step";
import StepCheck from "./StepCheck";
import TOC from "./TOC";

function MdxImg(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
): JSX.Element {
  const { alt, ...rest } = props;
  return <img alt={alt ?? ""} loading="lazy" decoding="async" {...rest} />;
}

const mdxComponents = {
  pre: CodeBlock,
  img: MdxImg,
  ProsCard,
  ConsCard,
  Step,
  StepCheck,
  TOC,
  HighlightText,
};

export default mdxComponents;
