import { NameGenerationParams } from '../types/nameGeneration';

export function generateChineseNamePrompt({
  lastName,
  gender,
  style,
  meaning,
  nameLength,
  birthDate
}: NameGenerationParams) {
  const basePrompt = `作为一个专业的中文取名专家，请为姓"${lastName}"的${gender === 'male' ? '男' : '女'}性生成${nameLength}个字的名字。

背景信息：
- 姓氏：${lastName}
- 性别：${gender === 'male' ? '男' : '女'}
- 名字字数：${nameLength}个字
- 风格要求：${style}
- 期望寓意：${meaning}
${birthDate ? `- 出生日期：${birthDate}` : ''}

要求：
1. 生成3个独特的名字建议
2. 每个名字需要考虑：
   - 音律和谐
   - 字形优美
   - 寓意深远
   - 五行相生
   - 文化内涵
   
3. 对每个名字提供：
   - 完整解释（包含每个字的含义）
   - 文化典故或诗词出处（如有）
   - 五行分析
   - 综合评分（1-100分）

请严格以JSON格式返回，结构如下：
{
  "names": [
    {
      "name": "完整名字",
      "meaning": "详细寓意解释",
      "cultural_notes": "文化内涵和五行分析",
      "score": 评分（1-100）
    }
  ]
}

注意事项：
- 避免生僻字
- 确保名字读音优美
- 考虑现代社会适用性
- 注重名字的独特性
- 注重名字的独特性`;


  return basePrompt;
}