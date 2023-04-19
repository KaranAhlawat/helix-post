(ns todo.components.hello 
  (:require
   [helix.core :refer [defnc]]
   [helix.dom :as d]
   [todo.styles.components.hello-module :as styles]))

(defnc hello
  []
  {:helix/features {:fast-refresh true}}
  (d/h1 {:class styles/hello} "CSS Module being used here."))
