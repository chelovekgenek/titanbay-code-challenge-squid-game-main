export const WINNER_PER_GAME_QUERY = `
    select 
        d.game_id as "game_id",
        sum(p.debt)::int as "prize",
        (
            select p2.id
            from public.player p2
            where p2.id not in (select d2.player_id from death d2)
        ) as "winner_id"
    from public.death d
    inner join public.player p on p.id = d.player_id 
    group by d.game_id
    order by d.game_id 
`

export interface WinnerPerGameResult {
  game_id: number
  winner_id: number
  prize: number
}
