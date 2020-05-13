package services

import play.api.libs.json._
import javax.inject._

/**
 * This trait represents a town that you can create in the game
 */
class Town @Inject()(corner1: Tile, corner2: Tile, corner3: Tile, _owner: Player){
  val corners = List(corner1, corner2, corner3);
  val vp = 1
  val owner = _owner
  
  def getResources: List[Resource] = { 
    val res = 
      for (tile <- corners) 
      yield tile.res
    res
  }

  implicit val tileWrites = (new Tile(-1, null, -1)).convToJson
  implicit val playerWrites = (new Player(-1, null)).convToJson

  val convToJson = new Writes[Town] {
    def writes(town: Town) = Json.obj(
      "owner"   -> town.owner,
      "corners" -> town.corners
    )
  }
}

