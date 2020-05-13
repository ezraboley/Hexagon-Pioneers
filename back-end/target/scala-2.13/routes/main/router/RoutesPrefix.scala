// @GENERATOR:play-routes-compiler
// @SOURCE:/home/ezra/Documents/personal/Hexagon-Pioneers/conf/routes
// @DATE:Wed May 13 15:39:43 CDT 2020


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
