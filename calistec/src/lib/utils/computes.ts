export function compute_total_volume(series: number | undefined, 
    reps: number | undefined, 
    extra_weight: number | undefined)
{
    if (series === undefined || reps === undefined || extra_weight === undefined) return 0
    return series*reps*(73+extra_weight);
}