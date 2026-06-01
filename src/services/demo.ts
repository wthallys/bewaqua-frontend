import type { Report, RankingItem, CompareResult } from '@/types'

export const DEMO_REPORT: Report = {
  id:           1,
  reab:         '08/2026',
  collected_at: '2026-02-24',
  responsible:  'CÍCERO JOSÉ DOS SANTOS',
  source_file:  'REAB-08-2026.pdf',
  total_points: 20,
  suitable:     10,
  unsuitable:   10,
  rainy_points: 4,
  avg_temp:     27.3,
  max_temp:     29.9,
  min_temp:     26.8,
  imported_at:  '2026-02-26T00:00:00',
  points: [
    { id:1,  report_id:1, point_number:19, collected_at:'2026-02-24', rainy:false, temperature:27.0, collected_time:'06:38', category:'suitable',   beach_name:'Praia do Pontal da Barra',  address:'Frente ao Motonaútica',         lat:-9.6975944, lon:-35.7768806 },
    { id:2,  report_id:1, point_number:20, collected_at:'2026-02-24', rainy:false, temperature:27.0, collected_time:'06:45', category:'suitable',   beach_name:'Praia do Pontal da Barra',  address:'Frente ao BOPE',                lat:-9.6896389, lon:-35.7679722 },
    { id:3,  report_id:1, point_number:21, collected_at:'2026-02-24', rainy:false, temperature:27.2, collected_time:'06:52', category:'unsuitable', beach_name:'Praia do Pontal da Barra',  address:'Frente ao SINDIFISCO',          lat:-9.6773278, lon:-35.7541167 },
    { id:4,  report_id:1, point_number:22, collected_at:'2026-02-24', rainy:false, temperature:27.3, collected_time:'07:04', category:'unsuitable', beach_name:'Praia do Pontal da Barra',  address:'±500m do Emissário CASAL',      lat:-9.6741500, lon:-35.7489917 },
    { id:5,  report_id:1, point_number:23, collected_at:'2026-02-24', rainy:false, temperature:27.2, collected_time:'07:10', category:'unsuitable', beach_name:'Praia da Avenida',          address:'Frente ao Posto SHELL',         lat:-9.6711083, lon:-35.7403889 },
    { id:6,  report_id:1, point_number:24, collected_at:'2026-02-24', rainy:false, temperature:29.9, collected_time:'07:16', category:'unsuitable', beach_name:'Praia da Avenida',          address:'Rua Barão de Anadia',           lat:-9.6704333, lon:-35.7353611 },
    { id:7,  report_id:1, point_number:25, collected_at:'2026-02-24', rainy:false, temperature:27.2, collected_time:'07:25', category:'unsuitable', beach_name:'Praia da Pajuçara',         address:'Rua João Carneiro',             lat:-9.6735639, lon:-35.7160167 },
    { id:8,  report_id:1, point_number:26, collected_at:'2026-02-24', rainy:false, temperature:27.0, collected_time:'07:32', category:'unsuitable', beach_name:'Praia da Pajuçara',         address:'Rest. Parmegiano',              lat:-9.6656861, lon:-35.7095361 },
    { id:9,  report_id:1, point_number:27, collected_at:'2026-02-24', rainy:false, temperature:26.9, collected_time:'07:40', category:'unsuitable', beach_name:'Praia da Ponta Verde',      address:'Corretora Márcio Raposo',       lat:-9.6645694, lon:-35.6992806 },
    { id:10, report_id:1, point_number:28, collected_at:'2026-02-24', rainy:false, temperature:27.0, collected_time:'07:47', category:'unsuitable', beach_name:'Praia de Ponta Verde',      address:'Hotel Maceió Atlantic',         lat:-9.6605444, lon:-35.6969139 },
    { id:11, report_id:1, point_number:29, collected_at:'2026-02-24', rainy:false, temperature:27.2, collected_time:'07:54', category:'unsuitable', beach_name:'Praia de Jatiúca',          address:'Hotel Maceió Atlantic',         lat:-9.6491944, lon:-35.6998056 },
    { id:12, report_id:1, point_number:30, collected_at:'2026-02-24', rainy:true,  temperature:27.0, collected_time:'08:03', category:'suitable',   beach_name:'Praia de Cruz das Almas',   address:'RITZ Residence',                lat:-9.6385000, lon:-35.6982028 },
    { id:13, report_id:1, point_number:31, collected_at:'2026-02-24', rainy:true,  temperature:27.0, collected_time:'08:07', category:'suitable',   beach_name:'Praia de Cruz das Almas',   address:'Condomínio Solaris',            lat:-9.6330944, lon:-35.6967250 },
    { id:14, report_id:1, point_number:32, collected_at:'2026-02-24', rainy:true,  temperature:27.0, collected_time:'08:13', category:'suitable',   beach_name:'Praia de Cruz das Almas',   address:'Leroy Merlin',                  lat:-9.6285000, lon:-35.6955583 },
    { id:15, report_id:1, point_number:33, collected_at:'2026-02-24', rainy:true,  temperature:26.9, collected_time:'08:18', category:'suitable',   beach_name:'Praia de Jacarecica',       address:'Frente à Rua A',               lat:-9.6134861, lon:-35.6876833 },
    { id:16, report_id:1, point_number:34, collected_at:'2026-02-24', rainy:false, temperature:27.0, collected_time:'08:28', category:'suitable',   beach_name:'Praia de Guaxuma',          address:'Entrada principal',             lat:-9.5922917, lon:-35.6680861 },
    { id:17, report_id:1, point_number:35, collected_at:'2026-02-24', rainy:false, temperature:26.8, collected_time:'08:39', category:'suitable',   beach_name:'Praia de Garça Torta',      address:'Perpendicular Rua São Pedro',   lat:-9.5834028, lon:-35.6097944 },
    { id:18, report_id:1, point_number:36, collected_at:'2026-02-24', rainy:false, temperature:27.9, collected_time:'08:48', category:'unsuitable', beach_name:'Rio Pratagy',               address:'Ponte AL-101 Norte',            lat:-9.5672139, lon:-35.6505528 },
    { id:19, report_id:1, point_number:37, collected_at:'2026-02-24', rainy:false, temperature:27.4, collected_time:'08:57', category:'suitable',   beach_name:'Praia do Mirante da Sereia', address:'Av. Beira Mar',                lat:-9.5654194, lon:-35.6451861 },
    { id:20, report_id:1, point_number:38, collected_at:'2026-02-24', rainy:false, temperature:27.6, collected_time:'09:06', category:'suitable',   beach_name:'Praia de Ipioca',           address:'Residence Water Front',         lat:-9.5310861, lon:-35.6048528 },
  ],
}

export const DEMO_REPORTS: Report[] = [
  { id:1, reab:'08/2026', collected_at:'2026-02-24', responsible:null, source_file:null, total_points:20, suitable:10, unsuitable:10, rainy_points:4, avg_temp:27.3, max_temp:29.9, min_temp:26.8, imported_at:'' },
  { id:2, reab:'07/2026', collected_at:'2026-02-17', responsible:null, source_file:null, total_points:20, suitable:12, unsuitable:8,  rainy_points:2, avg_temp:27.8, max_temp:30.1, min_temp:26.5, imported_at:'' },
  { id:3, reab:'06/2026', collected_at:'2026-02-10', responsible:null, source_file:null, total_points:20, suitable:14, unsuitable:6,  rainy_points:0, avg_temp:28.1, max_temp:30.4, min_temp:26.2, imported_at:'' },
  { id:4, reab:'05/2026', collected_at:'2026-02-03', responsible:null, source_file:null, total_points:20, suitable:11, unsuitable:9,  rainy_points:3, avg_temp:27.5, max_temp:30.0, min_temp:26.0, imported_at:'' },
]

export const DEMO_RANKING: RankingItem[] = DEMO_REPORT.points!.map(p => ({
  number:           p.point_number,
  beach_name:       p.beach_name,
  address:          p.address,
  total_weeks:      8,
  unsuitable_weeks: p.category === 'unsuitable' ? 6 : 1,
  pct_unsuitable:   p.category === 'unsuitable' ? 75.0 : 12.5,
  avg_temperature:  p.temperature ?? 27,
})).sort((a, b) => b.pct_unsuitable - a.pct_unsuitable)

export const DEMO_COMPARE: CompareResult = {
  before: '2026-02-10',
  after:  '2026-02-24',
  summary: { improved: 3, worsened: 2, unchanged: 15 },
  improved: [
    { number:30, beach_name:'Praia de Cruz das Almas',   category_before:'unsuitable', category_after:'suitable', change:'improved' },
    { number:34, beach_name:'Praia de Guaxuma',          category_before:'unsuitable', category_after:'suitable', change:'improved' },
    { number:37, beach_name:'Praia do Mirante da Sereia',category_before:'unsuitable', category_after:'suitable', change:'improved' },
  ],
  worsened: [
    { number:25, beach_name:'Praia da Pajuçara',  category_before:'suitable', category_after:'unsuitable', change:'worsened' },
    { number:29, beach_name:'Praia de Jatiúca',   category_before:'suitable', category_after:'unsuitable', change:'worsened' },
  ],
  unchanged: DEMO_REPORT.points!.slice(0, 15).map(p => ({
    number: p.point_number, beach_name: p.beach_name,
    category_before: p.category, category_after: p.category, change: 'unchanged' as const,
  })),
}
