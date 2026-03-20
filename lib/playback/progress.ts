import type { Scene } from '@/lib/types/stage';

export interface CourseProgress {
  /** 0-100 percentage of total actions completed across all scenes */
  percentage: number;
  /** Current scene index (0-based) */
  currentScene: number;
  /** Total number of scenes */
  totalScenes: number;
  /** Actions completed in current scene */
  actionsCompleted: number;
  /** Total actions in current scene */
  actionsInScene: number;
}

export function computeCourseProgress(
  scenes: Scene[],
  sceneIndex: number,
  actionIndex: number,
): CourseProgress {
  const totalActions = scenes.reduce((sum, s) => sum + (s.actions?.length || 0), 0);
  const currentSceneActions = scenes[sceneIndex]?.actions?.length || 0;

  if (totalActions === 0) {
    return { percentage: 0, currentScene: sceneIndex, totalScenes: scenes.length, actionsCompleted: 0, actionsInScene: 0 };
  }

  let completed = 0;
  for (let i = 0; i < sceneIndex && i < scenes.length; i++) {
    completed += scenes[i].actions?.length || 0;
  }
  completed += actionIndex;

  return {
    percentage: Math.round((completed / totalActions) * 100),
    currentScene: sceneIndex,
    totalScenes: scenes.length,
    actionsCompleted: actionIndex,
    actionsInScene: currentSceneActions,
  };
}
