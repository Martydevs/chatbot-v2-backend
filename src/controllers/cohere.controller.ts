import router from "../routes";
import { postGenerateCohere } from "../routes/cohere.route";

router.post("/cohere/generate", postGenerateCohere)