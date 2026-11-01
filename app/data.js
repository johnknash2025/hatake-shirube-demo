// Demo data. Everything here is fictional: the farm, the people, the fields and the numbers.
// No real place, address, coordinates, name, face or photo is used anywhere in this app.
window.DEMO = {
  farm: { name: "みどり台デモ農園", nameEn: "Midoridai Demo Farm", area: "架空の町（デモ）" },
  user: { name: "デモ ユーザー", role: "家族（デモ）" },
  fields: [
    { id: "a", name: "A 区画（南）", crop: "トマト", beds: 6, stage: "収穫中", health: "ok", note: "下葉の黄化が少し。追肥を検討。" },
    { id: "b", name: "B 区画（東）", crop: "ナス", beds: 4, stage: "収穫中", health: "warn", note: "ハダニの疑い。葉裏を確認。" },
    { id: "c", name: "C 区画（北）", crop: "ダイコン", beds: 5, stage: "生育初期", health: "ok", note: "間引き 2 回目の頃。" },
    { id: "d", name: "果樹エリア", crop: "ブルーベリー・カキ", beds: 0, stage: "落葉前", health: "ok", note: "カキ 3 本、収穫まで約 2 週間。" }
  ],
  records: [
    { date: "2026-10-31", field: "A 区画（南）", kind: "収穫", text: "トマト 4.2 kg（中玉中心）" },
    { date: "2026-10-30", field: "B 区画（東）", kind: "観察", text: "カメラ診断でハダニの疑い。葉裏に白い点。" },
    { date: "2026-10-29", field: "C 区画（北）", kind: "作業", text: "ダイコンを 1 本立ちに間引き。" },
    { date: "2026-10-27", field: "A 区画（南）", kind: "施肥", text: "有機化成 8-8-8 を畝あたり 300 g。" },
    { date: "2026-10-25", field: "果樹エリア", kind: "観察", text: "カキの色づき 6 割。" },
    { date: "2026-10-22", field: "B 区画（東）", kind: "収穫", text: "ナス 2.8 kg" }
  ],
  calendar: [
    { date: "2026-11-02", text: "B 区画：葉裏チェック・必要なら散水で洗い流す" },
    { date: "2026-11-04", text: "C 区画：追肥（1 回目）" },
    { date: "2026-11-08", text: "A 区画：トマト片付け開始の目安" },
    { date: "2026-11-12", text: "果樹エリア：カキ収穫" },
    { date: "2026-11-20", text: "タマネギ苗の植え付け（A 区画の跡）" }
  ],
  diagnosis: [
    { field: "A 区画（南）", time: "06:00", plant: "tomato", verdict: "ok", label: "おおむね良好", detail: "葉色は正常。下葉の軽い黄化は老化の範囲。" },
    { field: "B 区画（東）", time: "06:00", plant: "eggplant", verdict: "warn", label: "要確認：ハダニの疑い", detail: "葉の表に細かい白斑。葉裏の確認を推奨（確信度 0.62）。" },
    { field: "C 区画（北）", time: "06:00", plant: "radish", verdict: "ok", label: "良好", detail: "発芽そろい。密植ぎみの株を間引き済み。" }
  ],
  // Weekly wholesale-style price index for tomato, fictional (yen/kg).
  market: {
    crop: "トマト",
    actual: [420, 445, 430, 470, 510, 495, 530, 560],
    forecast: [575, 590, 610, 600],
    weeks: ["9/7", "9/14", "9/21", "9/28", "10/5", "10/12", "10/19", "10/26", "11/2", "11/9", "11/16", "11/23"]
  },
  expenses: [
    { date: "2026-10-27", item: "有機化成肥料 20 kg", yen: 3280 },
    { date: "2026-10-12", item: "防虫ネット", yen: 1980 },
    { date: "2026-10-03", item: "ダイコン種子", yen: 460 },
    { date: "2026-09-20", item: "支柱 20 本", yen: 2200 }
  ]
};
