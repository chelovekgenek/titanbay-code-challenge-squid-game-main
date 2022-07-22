export const WINNERS_QUERY = `
select p2.id as player_id
from public.player p2
left outer join public.death d2 on d2.player_id = p2.id
where d2.player_id is null
limit 1
`

export const PRIZE_PER_GAME_QUERY = `
select 
	d.game_id as "game_id",
    sum(p.debt)::int as "prize"
from public.death d
inner join public.player p on p.id = d.player_id 
group by d.game_id
order by d.game_id
`

export interface WinnersResult {
  player_id: number
}

export interface PrizePerGameResult {
  game_id: number
  prize: number
}
