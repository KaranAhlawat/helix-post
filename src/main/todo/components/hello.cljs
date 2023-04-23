(ns todo.components.hello
  (:require
   [helix.core :refer [defnc]]
   [helix.dom :as d]
   [todo.styles.components.hello-module :as css]))

(defnc hello
  []
  {:helix/features {:fast-refresh true}}
  (d/h1 {:class css/hello} "CSS Module being used here."))
