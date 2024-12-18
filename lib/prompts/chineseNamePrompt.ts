import { NameGenerationParams } from '../types/nameGeneration';

export function generateChineseNamePrompt({
  lastName,
  gender,
  style,
  meaning,
  nameLength,
  birthDate
}: NameGenerationParams) {
  const basePrompt = `作为专业的中文取名专家, 请为姓"${lastName}"的${gender === 'male' ? '男' : '女'}性生成${nameLength}个字的名字。请严格按照以下JSON格式返回, 不要包含任何特殊符号和中文标点，文字按照中文返回，不要英文:

{
  "names": [
    {
      "name": "完整名字",
      "meaning": "名字的含义描述, 使用英文逗号分隔不同部分",
      "cultural_notes": "文化内涵和五行分析, 最少一百字，使用英文逗号分隔不同部分",
      "score": 95
    }
  ]
}

要求:
1. 生成3个名字建议
2. 每个名字需要考虑:
- 音律和谐
- 字形优美
- 寓意深远
- 五行相生
- 文化内涵

名字要求:
- 风格: ${style}
- 期望寓意: ${meaning}
${birthDate ? `- 出生日期: ${birthDate}` : ''}

注意:
1. 必须使用英文标点符号
2. 不要使用中文标点符号
3. 不要使用特殊字符
4. 所有描述使用简单的文字
5. 每个字段内容不要太长
6. 评分范围在1-100之间`;

  return basePrompt;
}