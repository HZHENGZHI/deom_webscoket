package generator.mapper;
import java.util.List;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import generator.domain.exp;


/**
* @author huangguangzhun
* @description 针对表【exp】的数据库操作Mapper
* @createDate 2022-05-08 18:26:06
* @Entity generator.domain.exp
*/
public interface expMapper extends BaseMapper<exp> {
    List<exp> selectLink();


}
