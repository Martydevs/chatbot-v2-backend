import router from "../routes";
import { postGenerateGPT } from "../routes/openai.route";

router.post("/openai/generate", postGenerateGPT)