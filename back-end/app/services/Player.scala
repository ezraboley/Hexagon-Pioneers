package services

import play.api.libs.json._
import scala.collection.mutable.ListBuffer
import javax.inject._

class Player @Inject()(_id: Int, _board: Board) {
  val id = _id
  val board = _board

  val color: String = "blue"  // Placeholder
  private var vp: Int = 0

  def getVp: Int = vp
  /* We check the board, single source of truth, for which towns are ours
   */
  def towns: List[Town] = {
    val boardTowns = board.getTowns
    val t = for (town <- boardTowns if town.owner == this) 
      yield(town)

    t
  }

  /* TODO */
  def cities: List[Int] = {
    List(0)
  }

  /* TODO Needs to also check dev cards and Longest Road and Largest Army */
  def checkVp = {
    val _towns = towns
    val _cities = cities
    vp = _towns.length + _cities.length * 2
  }

  val convToJson = new Writes[Player] {
    def writes(player: Player) = Json.obj(
      "id" -> player.id,
      "vp" -> player.getVp
    )
  }
}
