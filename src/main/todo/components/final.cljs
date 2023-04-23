(ns todo.components.final
  (:require [helix.core :refer [defnc]]
            [helix.dom :as d]
            [todo.styles.components.final-module :as css]))

(defnc random-div
  []
  {:helix/features {:fast-refresh true}}
  (d/div {:class css/div}))